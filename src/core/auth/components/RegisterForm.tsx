import { useState } from "react";
import { useNavigate } from "react-router";
import * as z from "zod/mini";
import { Form } from "@base-ui/react/form";

import { useCoreTranslation } from "src/core/i18n/useCoreTranslation";
import { useRegister } from "../hooks/useRegister";
import { Field } from "src/ui/organisms/Field/Field";
import { Button } from "src/ui/atoms/Button/Button";

const createSchema = (t: ReturnType<typeof useCoreTranslation>["t"]) =>
  z
    .object({
      username: z.string().check(
        z.minLength(1, {
          error: t("core.auth.register.error.usernameRequired"),
        }),
        z.minLength(3, {
          error: t("core.auth.register.error.usernameMinLength"),
        })
      ),
      email: z
        .email({ error: t("core.auth.register.error.emailInvalid") })
        .check(
          z.minLength(1, { error: t("core.auth.register.error.emailRequired") })
        ),
      password: z
        .string()
        .check(
          z.minLength(1, t("core.auth.register.error.passwordRequired")),
          z.minLength(6, t("core.auth.register.error.passwordMinLength"))
        ),
      confirmPassword: z
        .string()
        .check(
          z.minLength(1, t("core.auth.register.error.confirmPasswordRequired"))
        ),
    })
    .check(
      z.refine((data) => data.password === data.confirmPassword, {
        message: t("core.auth.register.error.passwordMismatch"),
        path: ["confirmPassword"],
      })
    );

export const RegisterForm = () => {
  const { t } = useCoreTranslation();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string | string[]>>({});
  const { register, isPending } = useRegister();

  const submitForm = async (formValues: Form.Values) => {
    const schema = createSchema(t);
    const result = schema.safeParse(formValues);

    if (!result.success) {
      const fieldErrors = z.flattenError(result.error).fieldErrors;
      return {
        errors: fieldErrors,
      };
    }

    register({
      username: result.data.username as string,
      email: result.data.email as string,
      password: result.data.password as string,
    });

    return {
      errors: {},
    };
  };

  const handleSignInClick = () => {
    navigate("/login");
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
      <Field.Root name="username">
        <Field.Label>{t("core.auth.register.usernameLabel")}</Field.Label>
        <Field.Control type="text" autoComplete="username" required />
        <Field.Error match="valueMissing">
          {t("core.auth.register.error.usernameRequired")}
        </Field.Error>
        {errors.username?.[0] && (
          <Field.Error forceShow>{errors.username[0]}</Field.Error>
        )}
      </Field.Root>

      <Field.Root name="email">
        <Field.Label>{t("core.auth.register.emailLabel")}</Field.Label>
        <Field.Control type="email" autoComplete="email" required />
        <Field.Error match="valueMissing">
          {t("core.auth.register.error.emailRequired")}
        </Field.Error>
        <Field.Error match="typeMismatch">
          {t("core.auth.register.error.emailInvalid")}
        </Field.Error>
        {errors.email?.[0] && (
          <Field.Error forceShow>{errors.email[0]}</Field.Error>
        )}
      </Field.Root>

      <Field.Root name="password">
        <Field.Label>{t("core.auth.register.passwordLabel")}</Field.Label>
        <Field.Control type="password" autoComplete="new-password" required />
        <Field.Error match="valueMissing">
          {t("core.auth.register.error.passwordRequired")}
        </Field.Error>
        {errors.password?.[0] && (
          <Field.Error forceShow>{errors.password[0]}</Field.Error>
        )}
      </Field.Root>

      <Field.Root name="confirmPassword">
        <Field.Label>
          {t("core.auth.register.confirmPasswordLabel")}
        </Field.Label>
        <Field.Control type="password" autoComplete="new-password" required />
        <Field.Error match="valueMissing">
          {t("core.auth.register.error.confirmPasswordRequired")}
        </Field.Error>
        {errors.confirmPassword?.[0] && (
          <Field.Error forceShow>{errors.confirmPassword[0]}</Field.Error>
        )}
      </Field.Root>

      <div className="flex flex-col gap-3">
        <Button
          type="submit"
          variant="primary"
          isDisabled={isPending}
        >
          {isPending
            ? t("core.auth.register.submitting")
            : t("core.auth.register.submitButton")}
        </Button>
      </div>

      <div className="text-center">
        <span className="text-sm text-gray-600">
          {t("core.auth.register.haveAccount")}{" "}
        </span>
        <Button
          type="button"
          onClick={handleSignInClick}
          isDisabled={isPending}
        >
          {t("core.auth.register.signIn")}
        </Button>
      </div>
    </Form>
  );
};
