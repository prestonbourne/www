"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { cx } from "class-variance-authority";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


const Tabs = TabsPrimitive.Root;


export type TabsRootProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.Root
> & {
  defaultValue: string;
};


const BaseTabsRoot = ({ defaultValue, onValueChange, ...props }: TabsRootProps) => {

  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onValueChange?.(value);
  };

  return (
    <TabsPrimitive.Root
      {...props}
      value={activeTab}
      onValueChange={handleTabChange}
    />
  );
};

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
  });
  const tabsListRef = useRef<HTMLDivElement | null>(null);

  const updateIndicator = React.useCallback(() => {
    if (!tabsListRef.current) return;

    const activeTab = tabsListRef.current.querySelector<HTMLElement>(
      '[data-state="active"]'
    );
    if (!activeTab) return;

    const activeRect = activeTab.getBoundingClientRect();
    const tabsRect = tabsListRef.current.getBoundingClientRect();

    requestAnimationFrame(() => {
      setIndicatorStyle({
        left: activeRect.left - tabsRect.left,
        width: activeRect.width,
      });
    });
  }, []);

  useEffect(() => {
    // Initial update
    const timeoutId = setTimeout(updateIndicator, 0);

    // Event listeners
    window.addEventListener("resize", updateIndicator);
    const observer = new MutationObserver(updateIndicator);

    if (tabsListRef.current) {
      observer.observe(tabsListRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateIndicator);
      observer.disconnect();
    };
  }, [updateIndicator]);

  return (
    <div className="relative mb-4" ref={tabsListRef}>
      <TabsPrimitive.List
        ref={ref}
        className={cx(
          "relative inline-flex items-center justify-center gap-4",
          className
        )}
        {...props}
      />
      <div
        className="absolute bottom-0 h-[1px] border-b-1 border-dashed border-action transition-all duration-200 ease-in-out"
        style={indicatorStyle}
      />
    </div>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cx(
      "inline-flex items-center justify-center whitespace-nowrap px-1 py-2 transition-colors",
      "text-foreground hover:text-foreground data-[state=active]:text-action",
      "focus-visible:outline-none focus:outline-none cursor-pointer",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cx("mt-2 focus-visible:outline-none", className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { BaseTabsRoot as Tabs, TabsContent, TabsList, TabsTrigger };


export type TabsWithUrlStateProps = {
  urlStateKey?: string;
  syncOnMount?: boolean;
} & TabsRootProps;

export const TabsWithUrlState = ({
  urlStateKey = 'tab',
  defaultValue,
  onValueChange,
  syncOnMount = true,
  ...props
}: TabsWithUrlStateProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const hasInitialized = useRef(false);

  return (
    <Suspense fallback={<Tabs defaultValue={defaultValue} />}>
      <TabsWithUrlStateInner
        urlStateKey={urlStateKey}
        defaultValue={defaultValue}
        syncOnMount={syncOnMount}
        router={router}
        pathname={pathname}
        {...props}
      />
    </Suspense>
  );
}

const TabsWithUrlStateInner = ({
  urlStateKey,
  defaultValue,
  syncOnMount,
  router,
  pathname,
  ...props
}: TabsWithUrlStateProps & {
  router: ReturnType<typeof useRouter>;
  pathname: string;
}) => {
  const searchParams = useSearchParams();
  const hasInitialized = useRef(false);

  const handleValueChange = useCallback(
    (newValue: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(urlStateKey!, newValue);
      router.replace(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams, urlStateKey]
  );

  useEffect(() => {
    if (hasInitialized.current) {
      return;
    }
    hasInitialized.current = true;

    if (!syncOnMount) {
      return;
    }

    handleValueChange(defaultValue);
  }, [handleValueChange, defaultValue, syncOnMount]);

  return (
    <Tabs
      {...props}
      defaultValue={defaultValue}
      onValueChange={handleValueChange}
    />
  );
}
