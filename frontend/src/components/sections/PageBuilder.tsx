import Hero from "./Hero";
import SplitHero from "./SplitHero";
import VideoHero from "./VideoHero";
import ContentBlock from "./ContentBlock";
import CtaBanner from "./CtaBanner";
import HtmlBlock from "./HtmlBlock";
import FeaturesGrid from "./FeaturesGrid";
import LogoCarousel from "./LogoCarousel";
import Counter from "./Counter";
import OwlCarousel from "./OwlCarousel";
import ResourceTabs from "./ResourceTabs";
import NewsTicker from "./NewsTicker";
import SplitCardHero from "./SplitCardHero";





export default function PageBuilder({
    sections,
}: {
    sections: any[];
}) {

    return (
        <>
            {sections?.map((section) => {

                switch (section._type) {

                    case "hero":
                        return (
                            <Hero
                                key={section._key}
                                {...section}
                            />
                        );

                    case "splitHero":
                        return (
                            <SplitHero
                                key={section._key}
                                {...section}
                            />
                        );

                    case "videoHero":
                        return (
                            <VideoHero
                                key={section._key}
                                {...section}
                            />
                        );

                    case "contentBlock":
                        return (
                            <ContentBlock
                                key={section._key}
                                {...section}
                            />
                        );

                    case "ctaBanner":
                        return (
                            <CtaBanner
                                key={section._key}
                                {...section}
                            />
                        );

                    case "htmlBlock":
                        return (
                            <HtmlBlock
                                key={section._key}
                                {...section}
                            />
                        );

                    case "featuresGrid":
                        return (
                            <FeaturesGrid
                                key={section._key}
                                {...section}
                            />
                        );

                    case "logoCarousel":
                        return (
                            <LogoCarousel
                                key={section._key}
                                {...section}
                            />
                        );

                    case "counter":
                        return (
                            <Counter
                                key={section._key}
                                {...section}
                            />
                        );

                    case "owlCarousel":
                        return (
                            <OwlCarousel
                                key={section._key}
                                {...section}
                            />
                        );

                    case "resourceTabs":
                        return (
                            <ResourceTabs
                                key={section._key}
                                {...section}
                            />
                        );

                    case "newsTicker":
                        return (
                            <NewsTicker
                                key={section._key}
                                {...section}
                            />
                        );

                    case "splitCardHero":
                        return (
                            <SplitCardHero
                                key={section._key}
                                {...section}
                            />
                        );





                    default:
                        return null;
                }
            })}
        </>
    );
}