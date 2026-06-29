"use client";

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
  type CreateToasterReturn,
  type ToastOptions,
} from "@chakra-ui/react";
import type { FC, PropsWithChildren, ReactNode } from "react";

export const toaster = createToaster({
  placement: "bottom",
  pauseOnPageIdle: true,
});

// Chakra v3.36's toast components are typed without surfacing the render props
// (`toaster`/`children`) or, for the leaf text parts, `children` at all under
// React 19's stricter JSX typing. Re-type the parts we use; runtime is unaffected.
const ToasterRoot = ChakraToaster as unknown as FC<{
  toaster: CreateToasterReturn;
  insetInline?: { mdDown?: string };
  children: (toast: ToastOptions) => ReactNode;
}>;
const ToastTitle = Toast.Title as unknown as FC<
  PropsWithChildren<{ fontWeight?: string }>
>;
const ToastDescription = Toast.Description as unknown as FC<
  PropsWithChildren<{ fontSize?: string }>
>;
const ToastActionTrigger = Toast.ActionTrigger as unknown as FC<PropsWithChildren>;

export const Toaster = () => {
  return (
    <Portal>
      <ToasterRoot toaster={toaster} insetInline={{ mdDown: "4" }}>
        {(toast) => (
          <Toast.Root width={{ md: "sm" }}>
            {toast.type === "loading" ? (
              <Spinner size="sm" color="blue.solid" />
            ) : (
              <Toast.Indicator />
            )}
            <Stack gap="1" flex="1" maxWidth="100%">
              {toast.title && (
                <ToastTitle fontWeight="bold">{toast.title}</ToastTitle>
              )}
              {toast.description && (
                <ToastDescription fontSize="md">
                  {toast.description}
                </ToastDescription>
              )}
            </Stack>
            {toast.action && (
              <ToastActionTrigger>{toast.action.label}</ToastActionTrigger>
            )}
            {toast.closable && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </ToasterRoot>
    </Portal>
  );
};
