interface IProps {
  flashMessage: string;
}

export default function FlashMessage({ flashMessage }: IProps) {
  return (
    <div className="floating-alerts">
      {flashMessage && (
        <div className="alert alert-success text-center floating-alert shadow-sm">
          {flashMessage}
        </div>
      )}
    </div>
  );
}
