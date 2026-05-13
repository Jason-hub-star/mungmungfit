import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ContactAside,
  DogFitnessTools,
  Faq,
  FinalCta,
  Footer,
  Header,
  InternalLinks,
  Pricing,
  StickyCta,
  TargetDogs,
} from "@/components/site-sections";
import { Breadcrumb } from "@/components/breadcrumb";
import { buildBreadcrumbJsonLd, faqs, getSiteUrl, methods, servicePages, site } from "@/content/site";

type Props = {
  params: Promise<{ slug: string }>;
};

function getService(slug: string) {
  return servicePages.find((page) => page.slug === slug);
}

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getService(slug);
  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    keywords: [...page.keywords],
    alternates: {
      canonical: `/services/${page.slug}`,
    },
    openGraph: {
      title: `${page.title} | 멍멍피트`,
      description: page.description,
      url: `${getSiteUrl()}/services/${page.slug}`,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const page = getService(slug);
  if (!page) {
    notFound();
  }

  const isDogFitness = page.slug === "dog-fitness";

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: isDogFitness ? "Dog Fitness Training" : "Dog Home Training",
    name: page.title,
    alternateName: isDogFitness
      ? ["Dog Fitness", "Canine Fitness", "독피트니스"]
      : undefined,
    provider: {
      "@type": "LocalBusiness",
      name: "멍멍피트",
      telephone: "+82-10-2609-6593",
      url: getSiteUrl(),
    },
    areaServed: ["서울", "경기", "인천", "충청도"],
    description: page.description,
    offers: {
      "@type": "Offer",
      price: "89000",
      priceCurrency: "KRW",
    },
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "홈", path: "/" },
    { name: page.title, path: `/services/${page.slug}` },
  ]);

  const faqJsonLd = isDogFitness
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <Header />
      <section className="container subpage">
        <Breadcrumb
          crumbs={[
            { name: "홈", path: "/" },
            { name: "서비스", path: "/services/dog-fitness" },
            { name: page.title.replace(/^강아지 /, "") },
          ]}
        />
        <span className="eyebrow">Service</span>
        <h1>{page.h1}</h1>
        <p className="lead">{page.description}</p>
        <InternalLinks />
        <div className="sub-grid">
          <div className="grid">
            {methods.map((method) => (
              <article className="card sub-card" key={method.title}>
                <h2>{method.title}</h2>
                <p>{method.body}</p>
              </article>
            ))}
            <article className="card sub-card">
              <h2>멍멍피트 수업이 다른 점</h2>
              <p>
                {site.trainerTitle}가 강아지의 몸 사용, 보호자 손의 움직임,
                생활 공간의 동선을 함께 봅니다. 그래서 수업 후 보호자가 같은
                상황에서 다시 연습할 수 있는 루틴이 남습니다.
              </p>
            </article>
          </div>
          <ContactAside />
        </div>
      </section>
      {isDogFitness && (
        <>
          <DogFitnessTools />
          <TargetDogs />
        </>
      )}
      <Pricing />
      {isDogFitness && <Faq />}
      <FinalCta />
      <Footer />
      <StickyCta />
    </main>
  );
}
