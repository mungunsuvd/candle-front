import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useUser } from "../../Context/UserContext";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

interface Auth {
  isOpen: boolean;
  onClose: () => void;
}

export type Cred = {
  code: string;
  credential: string;
};

type Which = "login" | "sign-up" | "forgotpass" | "verify";

export interface BodyInterface {
  ChangeHandler: (selected: Which) => void;

  setCred: ({}: Cred) => void;
}

const AuthBody = (
  which: Which,
  ChangeHandler: (selected: Which) => void,

  setCred: ({}: Cred) => void,
  data: Cred
) => {
  const props = { ChangeHandler, setCred, data };
  switch (which) {
    case "login":
      return <SignIn {...props} />;
    case "sign-up":
      return <SignUp {...props} />;
  }
};

function Auth({ isOpen, onClose }: Auth) {
  const [which, setWhich] = useState<Which>("login");
  const [data, setdata] = useState({
    credential: "",
    code: "",
  });
  const {
    state: { token },
  } = useUser();

  const setCred = ({ credential, code }: Cred) => {
    setdata({
      credential,
      code,
    });
  };

  const ChangeHandler = (selected: Which) => {
    setWhich(selected);
  };

  useEffect(() => {
    onClose();
  }, [token]);

  useEffect(() => {
    setWhich("login");
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} size="xs" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{which !== "verify" && "Login"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{AuthBody(which, ChangeHandler, setCred, data)}</ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default Auth;
