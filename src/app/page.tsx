import {
  Heading,
  Paragraph as BaseBody,
  Link,
} from "@/components/typography";
import { ComponentProps } from "react";
import { Main, Header } from "@/components";

const Body = ({ children, ...rest }: ComponentProps<"p">) => {
  return (
    <BaseBody className="py-2 dark:text-sub-text" {...rest}>
      {children}
    </BaseBody>
  );
};


export default function Page() {
  const getStaggerVal = (int: number) =>
    ({
      "--animation-order": int,
    } as React.CSSProperties);

  return (
    <>
      <Header style={getStaggerVal(1)}>
        <Heading level={2} render="h1" className="pb-1">
          Preston Bourne
        </Heading>
        <BaseBody className="italic dark:text-white">
          chasing beautiful, performant software...
        </BaseBody>
      </Header>
      <Main>
        <Body style={getStaggerVal(2)}>
          i work as an engineer at{" "}
          <Link href="https://www.hashicorp.com/" target="_blank" icon>
            hashicorp
          </Link>{" "}
          where I build and maintain a suite of high traffic web applications,
          alongside internal tools for marketing, engineering and design teams.
        </Body>
        <Body style={getStaggerVal(3)}>
          i earned my Bachelor&rsquo;s in Design & Technology from{" "}
          <Link
            href="https://www.newschool.edu/parsons/bfa-design-technology/"
            target="_blank"
            icon
          >
            parsons school of design
          </Link>{" "}
          and had the privilege of studying as an exchange student at{" "}
          <Link href={"https://tech.cornell.edu/"} target="_blank" icon>
            cornell tech
          </Link>
        </Body>
        <Body style={getStaggerVal(4)} >feel free to reach out or connect with me, links below</Body>
      </Main>
    </>
  );
};
