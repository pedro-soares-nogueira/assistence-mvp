export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen flex items-center justify-center">
      {children}
    </section>
  );
}
