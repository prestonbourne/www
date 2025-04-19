interface PlaygroundProps
  extends React.PropsWithChildren<React.ComponentPropsWithRef<"figure">> {}
import { cx } from "class-variance-authority";

export function Playground({ children, className, ...props }: PlaygroundProps) {
  return (
    <figure
      className={cx(
        "w-full min-h-48 md:min-h-60 my-8 surface bg-background",
        /**
         * 1. radial-gradient creates a circular gradient from center
         * 2. First color stop is a 1px dot using the foreground color at 20% opacity
         * 3. Second color stop is transparent, creating sharp cutoff for the dot
         * 4. background-size: 24px 24px tiles this 1px dot pattern every 24px
         * This creates an even grid of dots spaced 24px apart both horizontally and vertically
         */
        "[background-image:radial-gradient(rgb(var(--foreground-muted)/0.2)_1px,transparent_1px)] [background-size:24px_24px]",
        className
      )}
      {...props}
    >
      {children}
    </figure>
  );
}
