import { useActionState, use } from "react";
import {OpinionsContext} from "../store/opinions-context";

export function NewOpinion() {

  const {addOpinion} = use(OpinionsContext);

  async function shareOpinionAction(prevState, formData) {
    const userName = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");

    const errors = {};

    if (!userName.trim()) {
      errors.userName = "User name is required";
    }

    if (title.trim().length < 5) {
      errors.title = "Title must be at least five characters long";
    }

    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.body =
        "Opinion must be at least ten and at most 300 characters long";
    }

    if (Object.keys(errors).length > 0) {
      return {
        errors,
        enteredValues: {
          userName,
          title,
          body,
        },
      };
    }

    await addOpinion({
      userName,
      title,
      body
    });

    return {
      errors: null,
      enteredValues: {
        userName: "",
        title: "",
        body: "",
      },
    };
  }

  const [formState, formAction] = useActionState(shareOpinionAction, {
    errors: null,
    enteredValues: {
      userName: "",
      title: "",
      body: "",
    },
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName || ""}
              className={formState.errors?.userName ? "input-error" : ""}
            />
            {formState.errors?.userName && (
              <span className="error-text">{formState.errors.userName}</span>
            )}
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title || ""}
              className={formState.errors?.title ? "input-error" : ""}
            />
            {formState.errors?.title && (
              <span className="error-text">{formState.errors.title}</span>
            )}
          </p>
        </div>

        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body || ""}
            className={formState.errors?.body ? "input-error" : ""}
          ></textarea>
          {formState.errors?.body && (
            <span className="error-text">{formState.errors.body}</span>
          )}
        </p>

        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}