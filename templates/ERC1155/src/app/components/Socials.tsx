import { Twitter, Instagram, Users2 } from 'lucide-react';

export default function Socials() {
  /**
   * NOTE: ADD SOCIALS HERE
   */
  return (
    <div className="w-full flex flex-row justify-evenly bg-secondary p-4 rounded-lg place-items-center">
      <p>Follow On:</p>
      <a
        href="https://twitter.com/petermazzocco"
        target="_blank"
        rel="noreferrer"
      >
        <button className="btn btn-square">
          <Twitter size={24} />
        </button>
      </a>
      <a
        href="https://instagram.com/petermazzocco"
        target="_blank"
        rel="noreferrer"
      >
        <button className="btn btn-square">
          <Instagram size={24} />
        </button>
      </a>
      <a href="https://hellopeter.xyz" target="_blank" rel="noreferrer">
        <button className="btn btn-square">
          <Users2 size={20} />
        </button>
      </a>
    </div>
  );
}
