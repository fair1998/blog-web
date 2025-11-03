declare interface NextAppLayoutProps<Params = Record<string, string>> {
  params: Promise<Params>;
  children: React.ReactNode;
}

declare type NextAppLayout<Params = Record<string, string>> = (
  props: NextAppLayoutProps<Params>
) => React.ReactNode | Promise<React.ReactNode>;

declare interface NextAppPageProps<Params = Record<string, string>> {
  params: Promise<Params>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

declare type NextAppPage<Params = Record<string, string>> = (
  props: NextAppPageProps<Params>
) => React.ReactNode | Promise<React.ReactNode>;
