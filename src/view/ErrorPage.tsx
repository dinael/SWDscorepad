import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError() as { status?: number; message?: string } | undefined;

  if (error?.status === 404) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Something went wrong</h1>
      <p>Please refresh the page or try again later.</p>
    </div>
  );
};

export default ErrorPage;
