"use client";
import Button from "@/components/ui/Button.jsx";
import Input from "@/components/ui/Input.jsx";
import LoginRegisterTemplate from "@/components/ui/LoginRegisterTemplate.jsx";
import useAuthStore from "@/store/authStore.js";
import { useState } from "react";

export default function LoginPage() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const data = useAuthStore();
  console.log(data);

  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v.trim() }));

  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Email required";
    if (!form.password) e.password = "Password required";
    if (form.password.length < 6)
      e.password = "Password must be at least 6 characters";

    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <LoginRegisterTemplate
      logoLabel=" Sign in to your account"
      bottomLabel="Don't have an account"
      bottomLink="/auth/register"
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <Input
          label="Email"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="you@example.com"
          icon="✉"
          error={errors.email}
        />

        <Input
          label="Password"
          type={show ? "text" : "password"}
          value={form.password}
          onChange={(e) => set("password", e.target.value)}
          placeholder="••••••••"
          icon="🔒"
          rightIcon={show ? "🙈" : "🐵"}
          onRightIconClick={() => setShow(!show)}
          error={errors.password}
        />

        <Button type="submit" full>
          Sign In →
        </Button>
      </form>
    </LoginRegisterTemplate>
  );
}
