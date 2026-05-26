import { Button } from '@/components/ui/button';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useInput from '@/hooks/useInput';
import { Link } from 'react-router-dom';

export default function ThreadInput({ createThread, loading }) {
  const [title, onTitleChange] = useInput('');
  const [body, onBodyChange] = useInput('');
  const [category, onCategoryChange] = useInput('');

  return (
    <form>
      <FieldGroup>
        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card"></FieldSeparator>
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input
            id="title"
            type="text"
            placeholder="Enter title thread here"
            required
            value={title}
            onChange={onTitleChange}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="category">Category</FieldLabel>
          <Input
            id="category"
            type="text"
            placeholder="Enter category thread here"
            value={category}
            onChange={onCategoryChange}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="body">Body</FieldLabel>
          <Textarea
            id="body"
            placeholder="Enter body thread here"
            value={body}
            onChange={onBodyChange}
          />
        </Field>
        <div className="flex gap-2 items-center w-full justify-end">
          <Link to="/threads">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Field className='w-fit'>
            <Button
              type="button"
              onClick={() => createThread({ title, body, category })}
              disabled={loading}
              className="w-fit"
            >
              {loading ? 'Creating...' : 'Create'}
            </Button>
          </Field>
        </div>
      </FieldGroup>
    </form>
  );
}
