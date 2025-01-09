import { Button as Btn } from "@nextui-org/button";

const styles = {
  button:
    "w-full sm:w-auto text-center text-xl font-bold py-4 px-20 focus:outline-none focus:shadow-outline",
  enabledButton: "bg-[#2CA9BC] text-white",
  disabledButton: "bg-gray-400 text-gray-200 cursor-not-allowed",
  container: "flex items-center justify-end my-5",
};

export const Button = ({
  onClick,
  text,
  type = "button",
  loading = false,
  disabled = false,
  radius="xl",
}) => {
  const buttonClass = disabled
    ? `${styles.button} ${styles.disabledButton}`
    : `${styles.button} ${styles.enabledButton}`;

  return (
    <div className={styles.container}>
      <Btn
        disabled={disabled}
        size="lg"
        isLoading={loading}
        type={type}
        radius={radius}
        className={buttonClass}
        onClick={onClick}
      >
        {text}
      </Btn>
    </div>
  );
};
