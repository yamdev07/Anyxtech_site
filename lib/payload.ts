import config from "@payload-config";
import { getPayload } from "payload";

/** Client Payload (API locale) réutilisable côté serveur. */
export const getPayloadClient = async () => getPayload({ config });
