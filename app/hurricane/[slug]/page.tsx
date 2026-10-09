import Link from "next/link";
import { notFound } from "next/navigation";
import { HurricaneCta } from "@/components/hurricane/cta";
import { HurricaneDisclaimer } from "@/components/hurricane/disclaimer";
import { RelatedLinks } from "@/components/hurricane/related";
import { RichText } from "@/components/hurricane/rich-text";
import { SourceList } from "@/components/hurricane/sources";
import { JsonLdScript } from "@/components/json-ld";
import { guideMetadata } from "@/lib/guide-metadata";
import { HURRICANE_UPDATED, getPost, posts } from "@/lib/hurricane";
import { articleJsonLd, howToJsonLd } from "@/lib/schema";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((item) => ({ slug: item.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return guideMetadata({
    title: post.title,
    description: post.description,
    path: post.path,
  });
}

export default async function HurricanePostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main id="content" className="hurr">
      <JsonLdScript
        data={articleJsonLd({
          headline: post.title,
          description: post.description,
          path: post.path,
          datePublished: HURRICANE_UPDATED,
          dateModified: HURRICANE_UPDATED,
        })}
      />
      <JsonLdScript
        data={howToJsonLd({
          name: post.howTo.name,
          description: post.howTo.description,
          path: post.path,
          steps: post.howTo.steps,
        })}
      />
      <article className="hurr-article">
        <header className="hurr-hero">
          <div className="wrap wrap--narrow">
            <p className="eyebrow">
              <Link className="link-liquid" href="/hurricane">
                Hurricane prep
              </Link>
            </p>
            <h1>{post.title}</h1>
            <p className="hurr-dek">{post.dek}</p>
            <HurricaneDisclaimer />
            <p className="hurr-updated">Updated {HURRICANE_UPDATED}.</p>
          </div>
        </header>
        <div className="wrap wrap--narrow hurr-body">
          {post.sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2>{section.heading}</h2>
              {section.blocks.map((block, index) => {
                if (block.type === "p") {
                  return (
                    <p key={`${section.id}-p-${index}`}>
                      <RichText text={block.text} />
                    </p>
                  );
                }
                const List = block.type === "ol" ? "ol" : "ul";
                return (
                  <List key={`${section.id}-${block.type}-${index}`}>
                    {block.items.map((item) => (
                      <li key={item}>
                        <RichText text={item} />
                      </li>
                    ))}
                  </List>
                );
              })}
            </section>
          ))}
          <section className="hurr-steps" aria-labelledby="steps-heading">
            <h2 id="steps-heading">In order</h2>
            <ol>
              {post.howTo.steps.map((step) => (
                <li key={step.name}>
                  <strong>{step.name}</strong>
                  <span>{step.text}</span>
                </li>
              ))}
            </ol>
          </section>
          <RelatedLinks
            links={[
              { href: "/hurricane", label: "Back to the hub" },
              ...post.related.filter((link) => link.href !== "/hurricane"),
            ]}
          />
          <SourceList sources={post.sources} />
        </div>
      </article>
      <HurricaneCta />
    </main>
  );
}
