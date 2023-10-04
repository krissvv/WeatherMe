declare module "*.svg" {
   const content: string;
   export default content;
}

type Unit = "metric" | "imperial";

type LocationT = {
   lat: number;
   lon: number;
};
