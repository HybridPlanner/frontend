import { ErrorComponent } from "@/components/ErrorComponent";

export default function ErrorPage() {
  return <ErrorComponent error={new Error("404 Not found")} />;
}
