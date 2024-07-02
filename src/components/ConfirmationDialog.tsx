import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

export function ConfirmationDialog({
  isOpenTrigger,
  action,
  trigger,
  questionMsg,
  captionMsg,
}: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  // Use useEffect to trigger onOpen when isOpenTrigger changes
  useEffect(() => {
    if (isOpenTrigger) {
      onOpen();
      trigger(false);
    }
  }, [isOpenTrigger, onOpen]);

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {captionMsg}
            </AlertDialogHeader>
            <AlertDialogBody>{questionMsg}</AlertDialogBody>
            <AlertDialogFooter>
              <Button
                leftIcon={<CloseIcon />}
                ref={cancelRef}
                onClick={() => {
                  onClose();
                }}
              >
                Kembali
              </Button>
              <Button
                leftIcon={<CheckIcon />}
                colorScheme="primary"
                onClick={() => {
                  onClose();
                  action();
                }}
                ml={3}
              >
                Ya, {captionMsg}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
