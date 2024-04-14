type Props = React.PropsWithChildren<{
  progress: React.ReactNode;
}>;

export function StepPageLayout({ progress, children }: Props) {
  return (
    <>
      <div className="fixed z-50 h-16 w-full bg-[#F3F4F6] py-4">
        <div className="lg:mx-48">{progress}</div>
      </div>
      <div className="mt-[104px] md:mx-48">{children}</div>
    </>
  );
}
