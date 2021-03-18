import { API } from "aws-amplify";
import { onError } from "./errorLib";

export default async () => {
  try {
    const response = await API.post(
      "secret-sharer",
      "/create-billing-portal-session"
    );

    console.log({ stripe: response });

    if (response.session && response.session.url) {
      window.location = response.session.url;
    }
  } catch (exception) {
    onError(exception);
  }
};
