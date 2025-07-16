import defaultMdxComponents from "fumadocs-ui/mdx"
import type { MDXComponents } from "mdx/types"
import {
  MediaViewer,
  ImageViewer,
  VideoViewer,
} from "@/components/ui/media-viewer"
import { MdxAccordion } from "@/components/ui/accordion"

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    MediaViewer,
    ImageViewer,
    VideoViewer,
    Accordion: MdxAccordion,
    ...components,
  }
}

export const useMDXComponents = getMDXComponents
