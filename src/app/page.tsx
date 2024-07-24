"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/clientApp";
import Layout from "./components/Layout";
import Input from "./components/Input";
import Button from "./components/Button";
import LogoImg from "./components/Logo";

interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AuthFormData>();

  const onSubmit = async (data: AuthFormData) => {
    try {
      if (isLogin) {
        // Sign in
        await signInWithEmailAndPassword(auth, data.email, data.password);
      } else {
        // Create account
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        const user = userCredential.user;

        // Save user data to Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          createdAt: new Date().toISOString(),
        });
      }
      // Redirect to home page on success
      router.push("/home");
    } catch (error) {
      setError(
        "Authentication failed. Please check your credentials and try again."
      );
      console.error("Authentication error:", error);
    }
  };

  return (
    <Layout title={isLogin ? "Login" : "Create Account"}>
      <div className="text-center flex gap-1 mb-[40px] justify-center">
        <LogoImg />
        <p className="text-3xl">devlinks</p>
      </div>
      <div className="text-center mb-8">
        <h1 className="text-heading-m text-left font-bold mb-2">
          {isLogin ? "Login" : "Create account"}
        </h1>
        <p className="text-body-m text-left text-gray-200">
          {isLogin
            ? "Add your details below to get back into the app"
            : "Let's get you started sharing your links!"}
        </p>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email address"
          type="email"
          {...register("email", { required: "Can't be empty" })}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          {...register("password", {
            required: "Please check again",
            minLength: {
              value: 8,
              message: "Password must contain at least 8 characters",
            },
          })}
          error={errors.password?.message}
        />
        {!isLogin && (
          <Input
            label="Confirm password"
            type="password"
            {...register("confirmPassword", {
              required: "Please check again",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            error={errors.confirmPassword?.message}
          />
        )}
        <Button type="submit">
          {isLogin ? "Login" : "Create new account"}
        </Button>
      </form>
      <p className="text-center mt-6 text-body-m">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-primary hover:underline"
        >
          {isLogin ? "Create account" : "Login"}
        </button>
      </p>
    </Layout>
  );
}
