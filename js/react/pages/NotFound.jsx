import { Link } from "react-router-dom";
import {
  NotFoundContainer,
  ErrorCode,
  ErrorTitle,
  ErrorDescription,
  BackLink,
} from "./NotFound.styles.js";

export default function NotFound() {
  return (
    <NotFoundContainer>
      <ErrorCode>404</ErrorCode>
      <ErrorTitle>Page Not Found</ErrorTitle>
      <ErrorDescription>
        Oops! The page you're looking for doesn't exist or has been moved.
      </ErrorDescription>
      <Link to="/">
        <BackLink>Return to Homepage</BackLink>
      </Link>
    </NotFoundContainer>
  );
}
