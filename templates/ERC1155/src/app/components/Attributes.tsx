type AttributeProps = {
  attributes: [{ trait_type: string; value: string }];
};

export default function Attributes({ attributes }: AttributeProps) {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
      {attributes?.map(item => (
        <div className="grid justify-center place-items-center bg-secondary rounded-xl w-32 h-16">
          <h2 className="text-md font-black">{item.trait_type}</h2>
          <p className="text-md font-thin">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
