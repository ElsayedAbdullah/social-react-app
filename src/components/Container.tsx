interface Props {
  children: React.ReactNode;
  wide?: boolean;
}

export default function Container({ children, wide }: Props) {
  return (
    <div className={`container py-md-5 ${wide ? "" : "container--narrow"}`}>
      {children}
    </div>
  );
}
