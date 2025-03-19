"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useSketchContext } from "./provider";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ReactEventHandler } from "react";
import { cx } from "class-variance-authority";
import { MotionHeading } from "@/components/typography";

export const SketchDialog: React.FC = ({}) => {
  const { activeSketch, setActiveSketch, SketchComponent } = useSketchContext();

  const shouldRender = !!activeSketch && !!SketchComponent;

  const isOnClient = typeof window !== "undefined";
  if (!isOnClient) return null;

  const handleCancel: ReactEventHandler<HTMLDialogElement> = (evt) => {
    evt.preventDefault();
    setActiveSketch(null);
  };

  const onClickOutside = (evt: React.MouseEvent<HTMLDialogElement>) => {
    const bounds = evt.currentTarget.getBoundingClientRect();
    if (
      evt.clientX < bounds.x ||
      evt.clientX > bounds.x + bounds.width ||
      evt.clientY < bounds.y ||
      evt.clientY > bounds.y + bounds.height
    ) {
      setActiveSketch(null);
    }
  };
  /* 
  TODO:
  would love to be able to customize exit animations here
  but framer seems to just ignore the exit: {transitions} prop
  */

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.dialog
          onClick={onClickOutside}
          ref={(node) => node?.showModal()}
          layoutId={`sketch-${activeSketch.id}`}
          key={`sketch-${activeSketch.id}`}
          onCancel={handleCancel}
          className={cx(
            "max-h-[60vh] max-w-none aspect-9/16 w-[calc(100vw-32px)]", // mobile
            "md:w-[90vw] md:aspect-video md:max-w-(--breakpoint-xl) mx-auto",
            "top-24 flex flex-col backdrop:bg-transparent",
            "bg-gray-100/90 dark:bg-gray-900/85 backdrop-blur-xs",
            "p-2 rounded-lg shadow-sheen overflow-hidden"
          )}
        >
          <button
            className="w-7 h-7 mb-2 flex items-center justify-center group" // wider so easier to click
            onClick={() => setActiveSketch(null)}
          >
            <div className="bg-red-500 rounded-full p-[1px] transition-colors text-red-900">
              <Cross2Icon className="opacity-0 group-hover:opacity-100 transition-opacity w-3 h-3" />
            </div>
          </button>
          <motion.div
            className="w-full h-full rounded-md overflow-hidden"
            transition={{ duration: 0.125 }}
            exit={{ transition: { duration: 0.125 } }}
          >
            <SketchComponent />
          </motion.div>
          <div className="mt-2">
            <MotionHeading
              level={3}
              key={`sketch-title-${activeSketch.id}`}
              layoutId={`sketch-title-${activeSketch.id}`}
              layout="position"
            >
              {activeSketch.title}
            </MotionHeading>
            <motion.p
              layoutId={`sketch-description-${activeSketch.id}`}
              layout="position"
            >
              {activeSketch.description}
            </motion.p>
          </div>
        </motion.dialog>
      )}
    </AnimatePresence>
  );
};
