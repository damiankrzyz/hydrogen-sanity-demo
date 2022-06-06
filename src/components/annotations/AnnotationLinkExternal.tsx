import type {
  PortableTextBlock,
  PortableTextMarkDefinition,
} from '@portabletext/types';
import clsx from 'clsx';

type Props = PortableTextBlock & {
  mark: PortableTextMarkDefinition & {
    newWindow?: boolean;
    url: string;
  };
};

const AnnotationLinkExternal = ({children, mark}: Props) => {
  return (
    <a
      className={clsx(
        'inline-flex items-center underline transition-opacity duration-300',
        'hover:opacity-60',
      )}
      href={mark?.url}
      rel="noopener noreferrer"
      target={mark?.newWindow ? '_blank' : '_self'}
    >
      <>{children}</>
    </a>
  );
};

export default AnnotationLinkExternal;
