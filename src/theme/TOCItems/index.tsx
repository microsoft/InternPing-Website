import {useEffect, useState, type ReactNode} from 'react';
import TOCItems from '@theme-original/TOCItems';
import type TOCItemsType from '@theme/TOCItems';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof TOCItemsType>;

// Docusaurus keeps inactive <TabItem> content in the DOM, so the generated TOC
// lists the headings of every platform tab at once. Keep only the visible ones.
export default function TOCItemsWrapper(props: Props): ReactNode {
  const {toc} = props;
  const [visibleIds, setVisibleIds] = useState<Set<string> | null>(null);

  useEffect(() => {
    const update = () => {
      const next = new Set<string>();
      toc.forEach(({id}) => {
        const heading = document.getElementById(id);
        if (!heading || !heading.closest('[role="tabpanel"][hidden]')) {
          next.add(id);
        }
      });
      setVisibleIds((previous) =>
        previous &&
        previous.size === next.size &&
        [...next].every((id) => previous.has(id))
          ? previous
          : next,
      );
    };

    update();

    const content = document.querySelector('.theme-doc-markdown');
    if (!content) {
      return undefined;
    }
    const observer = new MutationObserver(update);
    observer.observe(content, {
      subtree: true,
      attributes: true,
      attributeFilter: ['hidden'],
    });
    return () => observer.disconnect();
  }, [toc]);

  return (
    <TOCItems
      {...props}
      toc={visibleIds ? toc.filter(({id}) => visibleIds.has(id)) : toc}
    />
  );
}
