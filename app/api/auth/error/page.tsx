// app/auth/error/page.tsx
import ErrorClient from "./error-client";

export default function ErrorPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const error = searchParams.error;
  return <ErrorClient error={error as string} />;
}
