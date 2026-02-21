import { useState } from "react";
import { useNavigate } from "react-router";
import * as z from "zod/mini";
import { Form } from "@base-ui/react/form";

import { useCoreTranslation } from "src/core/i18n/useCoreTranslation";
import { useLogin } from "../hooks/useLogin";
import { Field } from "src/ui/organisms/Field/Field";
import { Button } from "src/ui/atoms/Button/Button";
import { Spinner } from "src/ui/atoms/Spinner/Spinner";

const createSchema = (t: ReturnType<typeof useCoreTranslation>["t"]) =>
  z.object({
    email: z
      .email({ error: t("core.auth.login.error.emailInvalid") })
      .check(
        z.minLength(1, { error: t("core.auth.login.error.emailRequired") }),
      ),
    password: z
      .string()
      .check(
        z.minLength(1, t("core.auth.login.error.passwordRequired")),
        z.minLength(6, t("core.auth.login.error.passwordMinLength")),
      ),
  });

export const LoginForm = () => {
  const { t } = useCoreTranslation();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { login, isPending } = useLogin();

  const submitForm = async (formValues: Form.Values) => {
    const schema = createSchema(t);
    const result = schema.safeParse(formValues);

    if (!result.success) {
      return {
        errors: z.flattenError(result.error).fieldErrors,
      };
    }

    login({
      email: result.data.email,
      password: result.data.password,
    });

    return {
      errors: {},
    };
  };

  const handleCreateAccountClick = () => {
    navigate("/signup");
  };

  return (
    <Form
      className="w-full max-w-md space-y-6"
      errors={errors}
      validationMode="onBlur"
      onFormSubmit={async (formValues) => {
        const response = await submitForm(formValues);
        setErrors(response.errors);
      }}
    >
      <Field.Root name="email">
        <Field.Label>{t("core.auth.login.emailLabel")}</Field.Label>
        <Field.Control type="email" autoComplete="email" required />
        <Field.Error />
      </Field.Root>

      <Field.Root name="password">
        <Field.Label>{t("core.auth.login.passwordLabel")}</Field.Label>
        <Field.Control
          type="password"
          autoComplete="current-password"
          required
        />
        <Field.Error />
      </Field.Root>

      <div className="flex flex-col gap-3">
        <Button type="submit" variant="primary" isDisabled={isPending}>
          {isPending
            ? t("core.auth.login.submitting")
            : t("core.auth.login.submitButton")}
        </Button>

        <Button
          type="button"
          onClick={handleCreateAccountClick}
          isDisabled={isPending}
        >
          {t("core.auth.login.createAccount")}
        </Button>
      </div>

      <div className="text-center">
        <Button type="button">
          {isPending && <Spinner />}
          {t("core.auth.login.forgotPassword")}
        </Button>
      </div>
    </Form>
  );
};
