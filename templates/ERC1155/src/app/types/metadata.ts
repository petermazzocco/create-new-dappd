/**
 * A generic type for metadata that can be used to grab the image, name, desciprtion, external_url
 * and more.
 */

export type TMetadata = {
  description: string;
  external_url: string;
  image: string;
  name: string;
  attributes: [
    {
      trait_type: string;
      value: string;
    },
  ];
};
