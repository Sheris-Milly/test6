import { useState } from "react";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthForms() {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 md:p-12">
      <AnimatePresence mode="wait">
        {showLogin ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            <LoginForm onToggleForm={toggleForm} />
          </motion.div>
        ) : (
          <motion.div
            key="register"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            <RegisterForm onToggleForm={toggleForm} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
