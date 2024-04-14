type Props = React.PropsWithChildren<{
  progress: React.ReactNode;
}>;

export function StepPageLayout({ progress, children }: Props) {
  return (
    <>
      <div className="sticky top-0 z-50 h-16 w-full bg-[#F3F4F6] py-4">
        <div className="lg:mx-48">{progress}</div>
      </div>
      <div className="xs:mx-8 mt-10 px-2 sm:mx-20 lg:mx-48">{children}</div>
    </>
  );
}
