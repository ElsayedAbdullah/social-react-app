import { useEffect } from "react";
import Container from "./Container";

interface Props {
  children: React.ReactNode;
  title?: string;
  wide?: boolean;
}

export default function Page({ children, title, wide }: Props) {
  useEffect(() => {
    document.title = `${title} | Social App`;
    window.scrollTo(0, 0);
  }, [title]);
  return <Container wide={wide}>{children}</Container>;
}
