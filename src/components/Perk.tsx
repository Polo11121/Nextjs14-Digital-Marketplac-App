import { LucideIcon } from "lucide-react";

type Props = {
  name: string;
  description: string;
  Icon: LucideIcon;
};

export const Perk = ({ name, description, Icon }: Props) => (
  <div
    key={name}
    className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
  >
    <div className="md:flex-shrink-0 flex justify-center">
      <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
        {<Icon className="h-1/3 w-1/3" />}
      </div>
    </div>
    <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
      <h3 className="text-base font-medium text-gray-900">{name}</h3>
      <p className="mt-3 text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);
