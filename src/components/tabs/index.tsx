"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { cx } from "class-variance-authority";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Tabs = TabsPrimitive.Root;

type TabsRootProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
  urlStateKey?: string;
  defaultValue: string;
  setToUrl?: boolean;
};

const TabsRoot = ({ urlStateKey, defaultValue, value, onValueChange, setToUrl = true, ...props }: TabsRootProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasInitialized = useRef(false);



  const isUrlControlled = !!urlStateKey;
  
  const handleValueChange = (newValue: string) => {
    if (isUrlControlled) {
      const params = new URLSearchParams(searchParams);
      params.set(urlStateKey, newValue);
      router.replace(`${pathname}?${params.toString()}`);
    }
    onValueChange?.(newValue);
  };

  const currentValue = isUrlControlled 
    ? searchParams.get(urlStateKey) || defaultValue
    : value || defaultValue;

    useEffect(() => {
      if (hasInitialized.current) {
        return;
      }
  
      hasInitialized.current = true;
      
      if (!setToUrl || !urlStateKey) {
        return;
      }
  
      const params = new URLSearchParams(searchParams);
      params.set(urlStateKey, currentValue);
      router.replace(`${pathname}?${params.toString()}`);
    }, [router, setToUrl, urlStateKey, searchParams, pathname, currentValue]);

  return (
    <TabsPrimitive.Root
      {...props}
      value={currentValue}
      onValueChange={handleValueChange}
      onLoad={() => {
        console.log("onLoad", setToUrl, urlStateKey);
  
      }}
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
    className={cx(
      "mt-2 focus-visible:outline-none",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { TabsRoot as Tabs, TabsContent, TabsList, TabsTrigger };