import { ApolloError } from "@apollo/client";

const ErrorMessage = (props: { error: ApolloError }) => {
  const error = props.error;

  return (
    <h4 className="text-center my-5">
      {error.message === "404: Not Found"
        ? "¡No results for that keyword!"
        : "Error: " + error.message}
    </h4>
  );
};

export default ErrorMessage;
