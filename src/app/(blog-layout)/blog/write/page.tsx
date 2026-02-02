import { PostEditorContainer } from '@/components/post/post-editor-container';

import { createPostAction } from './page.actions';

export default async function Page() {
  return (
    <PostEditorContainer
      mode='blog'
      action={createPostAction}
      submitLabel='게시하기'
    />
  );
}
