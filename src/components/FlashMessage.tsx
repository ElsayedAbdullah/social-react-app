interface IProps {
  flashMessages: string[];
}

export default function FlashMessage({ flashMessages }: IProps) {
  return (
    <div className="floating-alerts">
      {flashMessages.map((message, index) => (
        <div
          key={index}
          className="alert alert-success text-center floating-alert shadow-sm"
        >
          {message}
        </div>
      ))}
    </div>
  );
}
