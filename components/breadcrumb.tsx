import Link from "next/link";
import type { Route } from "next";

export type BreadcrumbCrumb = {
  name: string;
  /** 마지막 항목(현재 페이지)이면 path 생략 가능. */
  path?: string;
};

export function Breadcrumb({ crumbs }: { crumbs: BreadcrumbCrumb[] }) {
  if (crumbs.length === 0) return null;

  return (
    <nav aria-label="페이지 경로">
      <ol className="breadcrumb">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          if (isLast || !crumb.path) {
            return (
              <li key={`${crumb.name}-${index}`}>
                <span aria-current="page">{crumb.name}</span>
              </li>
            );
          }
          return (
            <li key={`${crumb.name}-${index}`}>
              <Link href={crumb.path as Route}>{crumb.name}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
