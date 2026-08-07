import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  NotFoundContainer,
  ErrorCode,
  ErrorTitle,
  ErrorDescription,
  BackLink,
} from "./NotFound.styles.js";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <NotFoundContainer>
      <ErrorCode>404</ErrorCode>
      <ErrorTitle>{t("notFound.title")}</ErrorTitle>
      <ErrorDescription>{t("notFound.description")}</ErrorDescription>
      <Link to="/">
        <BackLink>{t("notFound.returnHome")}</BackLink>
      </Link>
    </NotFoundContainer>
  );
}
