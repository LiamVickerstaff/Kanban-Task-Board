import Svg from "@/assets/icons/KebabIcon.svg?react";

export default function KebabIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Svg
      {...props}
      width={4}
      height={16}
      preserveAspectRatio="xMidYMid meet"
      style={{ flexShrink: 0 }}
    />
  );
}
