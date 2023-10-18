/**
 * A generic type for metadata that can be used to grab the image, name, desciprtion, external_url
 * and more.
 * This type follows the OpenSea standard for ERC1155 metadata. If you are experiencing issues with
 * type safety on your metadata, please check that your metadata follows the OpenSea standard.
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
