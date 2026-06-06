import { Button } from '@/components/ui/button';
import { Field, FieldGroup } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import useInput from '@/hooks/useInput';

export default function CommentInput({ createComment, threadId, loading }) {
  const [content, onContentChange, setContent] = useInput('');

  return (
    <form>
      <FieldGroup>
        <Field>
          <Textarea
            id="content"
            placeholder="Enter comment here"
            value={content}
            onChange={onContentChange}
            required
          />
        </Field>
        <div className="flex w-full justify-end">
          <Field className="w-fit">
            <Button
              type="button"
              onClick={() => {
                createComment({ threadId, content });
                setContent('');
              }}
              disabled={loading}
              className="w-fit"
            >
              {loading ? 'Loading...' : 'Add'}
            </Button>
          </Field>
        </div>
      </FieldGroup>
    </form>
  );
}
