# Optimistic UI in React

> Build interfaces that feel instant by updating the UI before the server responds.

## Introduction

Have you ever noticed how applications like Instagram, Facebook, Reddit, TikTok, or GitHub seem to respond instantly when you interact with them?

Tap the ❤️ button on an Instagram post and the heart immediately turns red. The like count increases instantly. There is no visible loading spinner, no noticeable waiting period, and no interruption to your experience. Yet behind the scenes, your device still needs to communicate with a remote server somewhere in the world.

So how is that possible?

The answer is **Optimistic UI**.

Optimistic UI is one of the most common techniques used in modern web and mobile applications to make interfaces feel incredibly fast and responsive. Instead of waiting for the server to confirm that an action was successful, the application **optimistically assumes that everything will go well** and immediately updates what the user sees.

Only after updating the interface does the application send a request to the server in the background.

If the server confirms the request, nothing changes because the interface is already showing the correct result. If something goes wrong, the application simply restores the previous state and informs the user that the operation failed.

This approach greatly improves the user experience because people perceive the application as being much faster, even though the actual network request still takes exactly the same amount of time.

## What Does "Optimistic" Mean?

The word _optimistic_ simply means **expecting the best possible outcome**.

In everyday life, optimism means believing that something good is likely to happen.

For example, imagine ordering food through a delivery app.

After pressing the **Place Order** button, the application immediately takes you to an order tracking screen instead of making you wait on the checkout page while it contacts the restaurant.

The application is optimistic that your order will be accepted.

If the restaurant later rejects the order because it's closed, the application informs you and returns you to the ordering screen.

Software works in exactly the same way.

Rather than making the user wait for confirmation before updating the interface, we assume success first and deal with failures only if they occur.

This small design decision has a surprisingly large impact on how responsive an application feels.

## The Traditional Approach

Before Optimistic UI became popular, applications generally followed a much simpler workflow.

```text
User clicks Like
       │
       ▼
Send request to server
       │
       ▼
Wait...
       │
       ▼
Server responds
       │
       ▼
Update the interface
```

Although this workflow is technically correct, it creates an unnecessary delay.

Even if the server only takes one second to respond, users still experience one second of inactivity.

That delay may seem small, but humans are extremely sensitive to waiting. Research in human-computer interaction has consistently shown that users judge an application's quality by **how quickly it responds to their actions**, not by how quickly the underlying computation actually finishes.

## The Optimistic Approach

Optimistic UI reverses the order of events.

Instead of waiting for the server, we update the interface immediately.

```text
User clicks Like
       │
       ▼
Update the interface immediately ❤️
       │
       ▼
Send request to the server
       │
       ├──────── Success
       │              │
       │              ▼
       │        Keep the UI
       │
       └──────── Failure
                      │
                      ▼
             Restore previous state
```

Notice that the network request still exists.

We haven't made the internet faster.

We haven't reduced latency.

We have simply removed the waiting **from the user's perspective**.

This is an example of improving **perceived performance** rather than actual performance.

## Perceived Performance

One of the biggest goals in modern frontend development is improving **perceived performance**.

Actual performance refers to how long the computer or server really takes to complete a task.

Perceived performance refers to how fast the application _feels_ to the person using it.

These two things are not always the same.

Imagine two applications.

Application A waits for two seconds before showing any changes.

Application B updates the interface immediately but still takes two seconds to finish communicating with the server.

Although both applications require exactly the same amount of time to complete the request, almost everyone will describe Application B as being significantly faster because it responds instantly to their interaction.

Modern applications are designed around this principle.

Instead of forcing users to watch loading indicators after every click, they acknowledge the user's action immediately and perform the expensive work in the background.

## Optimistic UI in Its Purest Form

Before introducing servers and API requests, it's useful to understand the idea in its simplest form.

Imagine we have a button that lets users like a post.

Without any backend involved, the code is surprisingly straightforward.

```jsx
const [liked, setLiked] = useState(false);
const [likes, setLikes] = useState(147);

function handleLike() {
  setLiked(!liked);
  setLikes(liked ? likes - 1 : likes + 1);
}
```

When the button is clicked, React updates the component state immediately.

The heart changes color.

The number of likes changes.

There is no waiting because there is no server.

This example demonstrates the core idea behind optimistic updates.

The interface changes immediately in response to the user's action.

## Bringing the Server Back

Real applications rarely store data only inside React state.

Eventually, the updated information needs to be saved in a database.

That means our optimistic update now has an extra responsibility.

1. Update the interface immediately.
2. Send the updated data to the server.
3. Keep the changes if the request succeeds.
4. Restore the previous state if the request fails.

This extra step introduces an important challenge.

What happens if the server rejects the request?

Perhaps the user's internet connection disappeared.

Perhaps the server is temporarily unavailable.

Perhaps the request timed out.

If we've already updated the interface, we now need a way to undo those changes.

This process is called a **rollback**.

## Why We Need Rollbacks

A rollback simply means restoring the interface to its previous state.

Imagine liking a post.

```text
❤️ 147
```

You click the Like button.

```text
❤️ 148
```

Everything appears correct.

However, a second later the server replies with an error.

Since the server rejected the request, our application restores the previous values.

```text
❤️ 147
```

From the user's perspective, the application responded instantly while still maintaining correct data.

Optimistic updates and rollbacks always work together.

One without the other creates inconsistent applications.

## Building Our Example

To demonstrate these ideas, we'll build a simplified Instagram-style post that supports optimistic likes and bookmarks.

Instead of immediately connecting to a real backend, the project begins with a small piece of static data that represents a post. This allows us to focus on the user interface before introducing asynchronous requests.

As the tutorial progresses, we'll replace those placeholder values with data fetched from the server, introduce loading states to prevent a flash of fake content, display a skeleton loader while the request is in progress, and finally implement optimistic updates with automatic rollback whenever the server rejects a request.

By the end of the project, you'll understand not only how optimistic updates work, but also why applications like Instagram feel so responsive despite relying on network requests for almost every interaction.

## Building Our Optimistic UI Project

Now that we understand the theory behind Optimistic UI, it's time to put those ideas into practice.

Throughout the rest of this guide, we'll build a simplified Instagram-style post that allows users to like and bookmark content. At first glance, this may seem like a fairly simple component, but it contains many of the same techniques used in production applications.

Our project will fetch data from a server, display a loading skeleton while waiting for the response, instantly update the interface whenever a user likes or bookmarks a post, and gracefully recover if the server rejects the request.

By the end of this project, you'll understand not only _how_ optimistic updates work, but also _why_ every line of code exists.

## Starting with Fake Data

Before we even think about making API requests, our project begins with a small piece of static data.

```jsx
const fakePost = {
    ...
}
```

This object simply represents what a post might look like after it has been fetched from a database.

You may be wondering why we don't immediately fetch data from the server instead.

There are several reasons.

When building applications, developers often separate the process of designing the interface from the process of connecting it to a backend. By creating temporary data, we can build and style the component long before the server exists.

This approach also makes development significantly easier because the interface always has predictable data to display.

Once we're happy with how everything looks, we can gradually replace this placeholder information with real server data.

Many companies follow exactly this workflow. Designers create mockups, frontend developers build interfaces using placeholder content, and only later connect those components to a real API.

## Why We Still Fetch Real Data

Although our project begins with static data, the goal isn't to keep using it forever.

The fake post simply acts as a blueprint for the structure of our data.

When the component mounts, React fetches the real post from our local server and replaces those placeholder values with the actual information stored inside our database.

Without this step, every user would always see the exact same likes, bookmarks, and post information regardless of what exists on the server.

Fetching real data ensures that the interface always reflects the latest state of the application.

## Understanding the Loading State

One of the easiest mistakes beginners make is allowing fake data to briefly appear before the real data finishes loading.

Imagine this sequence.

```text
Page Opens

↓

Fake Post Appears

↓

Server Responds

↓

Real Post Replaces Fake Post
```

Although this only lasts a fraction of a second, users notice it.

The interface appears to "flash" as placeholder content is suddenly replaced with real content.

This is commonly referred to as a **Flash of Fake Content**.

It feels distracting, unprofessional, and immediately tells users that the application is still loading.

To prevent this, our component begins with the loading state already enabled.

```jsx
const [isLoading, setIsLoading] = useState(true);
```

Notice that the initial value is **true**, not **false**.

This small decision is incredibly important.

Instead of immediately rendering our fake post, React first displays a loading screen while the real request is taking place.

Only after the request completes do we display the actual post.

This completely hides the temporary placeholder data from the user.

## Why Not Start With `false`?

Suppose we wrote this instead.

```jsx
const [isLoading, setIsLoading] = useState(false);
```

Now React believes the page has already finished loading.

The component immediately renders using the values currently available—which are our fake values.

Milliseconds later, the API request finishes.

React updates every piece of state again.

The user briefly sees one post before it suddenly changes into another.

Although technically correct, the experience feels messy.

By starting with `true`, users never see those temporary values at all.

Instead, they immediately see a loading placeholder while React quietly replaces the fake data with the real data behind the scenes.

## Skeleton Loaders

Instead of displaying a spinner while waiting for the server, our project renders a **Skeleton Loader**.

```jsx
if (isLoading) return <PostSkeleton />;
```

Skeleton screens have become the standard loading experience across modern applications.

Open Instagram.

Instead of showing a spinning icon while posts load, Instagram displays grey boxes that already resemble posts.

LinkedIn does the same thing.

So does:

- Facebook.
- YouTube.
- TikTok.
- X.

Even GitHub has adopted skeleton loaders in many parts of its interface.

Why?

Because skeletons preserve the page layout.

The user immediately understands where content will appear, even if the actual data hasn't arrived yet.

This creates the illusion that the application is already working instead of sitting idle.

Psychologically, skeleton screens make waiting feel significantly shorter because users can already visualize the final layout.

Spinners, on the other hand, communicate only one thing:

> "Please wait."

Skeletons communicate something much better.

> "Your content is almost ready."

Although both approaches require exactly the same network time, skeleton loaders dramatically improve perceived performance.

## Fetching the Post

Once the component mounts, React executes our `useEffect`.

```jsx
useEffect(() => {

    async function getPost() {

        ...

    }

    getPost();

}, []);
```

The empty dependency array tells React to run this effect only once after the component is first rendered.

Inside the effect, we fetch our post from the server.

```jsx
const res = await fetch(...);
const data = await res.json();
```

The `await` keyword pauses this asynchronous function until the server responds.

Meanwhile, React remains completely responsive.

It continues rendering the loading skeleton instead of freezing the page.

When the request eventually finishes, we update each piece of state using the values returned from the server.

```jsx
setLikesCount(data.postLikes);
setIsLiked(data.postLiked);
setBookmarksCount(data.postBookmarks);
setIsBookmarked(data.postBookmarked);
```

Finally, we tell React that loading has finished.

```jsx
setIsLoading(false);
```

React immediately renders the real post, replacing the skeleton loader.

Notice what happened here.

The fake data never became visible.

Users only ever saw two things:

1. The skeleton loader.
2. The final post.

This creates a much smoother experience than briefly flashing placeholder content.

## Introducing `useRef`

Optimistic updates require us to solve an interesting problem.

Imagine a user likes a post.

We immediately increase the like count.

A second later, the server replies with an error.

How do we know what the previous values were?

If we've already changed the state, the old values are gone.

This is exactly why our project uses `useRef`.

```jsx
const frozenLiked = useRef(null);
const frozenLikesCount = useRef(null);
```

Think of a ref as a small storage box that React keeps for your component.

Unlike state, updating a ref **does not trigger another render**.

This makes refs perfect for storing information that React doesn't need to display on the screen.

Before we optimistically update the interface, we save the current values.

```jsx
frozenLiked.current = isLiked;
frozenLikesCount.current = likesCount;
```

These values become our safety net.

If the server later rejects the request, we simply restore them.

```jsx
setIsLiked(frozenLiked.current);
setLikesCount(frozenLikesCount.current);
```

This process is called a **rollback**.

Without these snapshots, we would have no reliable way to recover from failed requests.

This is one of the hidden details behind optimistic updates that many beginners overlook.

Optimistic updates are never just about updating the UI immediately—they're equally about being prepared to undo those updates when reality doesn't match our optimistic assumption.

## Building the Optimistic Like Feature

Everything we've discussed so far has been leading to this moment.

This is where our application actually becomes _optimistic_.

When the user presses the Like button, we don't immediately contact the server. Instead, we first update the interface, making it appear as though the operation has already succeeded. Only afterwards do we synchronize those changes with the backend.

This small change in execution order is what makes modern applications feel so responsive.

Let's walk through the `handleLikes()` function one step at a time.

## Step 1 — Taking a Snapshot

The first thing our function does is save the current state.

```jsx
frozenLiked.current = isLiked;
frozenLikesCount.current = likesCount;
```

At first glance, this might seem unnecessary.

After all, we already have the current values inside `isLiked` and `likesCount`.

So why save them again?

The answer lies in what we're about to do next.

Within a few lines, we're going to replace these values with new ones. Once React updates the state, the old values are effectively lost. If something goes wrong, we need a way to restore them.

This is exactly why we create a snapshot before making any changes.

You can think of it like pressing **Ctrl + S** before editing a document.

If everything goes well, you'll never need the saved version.

If something goes wrong, you'll be very glad you have it.

Our refs serve exactly the same purpose.

## Why We Use `useRef` Instead of State

A common question beginners ask is:

> "Why not store the previous values in another piece of state?"

Technically, you could.

However, it wouldn't be the best choice.

Remember that every time state changes, React schedules another render.

Our snapshot isn't something the user needs to see.

It's simply temporary information that exists in case we need to undo our optimistic update.

Because of that, a ref is a much better choice.

Updating a ref doesn't cause the component to render again.

It quietly stores data behind the scenes while React continues rendering normally.

This is exactly what refs were designed for—persisting mutable values without affecting the UI.

## Step 2 — Calculating the Next State

Next, we calculate what the new values should be.

```jsx
const liked = isLiked ? false : true;
const likes = isLiked ? likesCount - 1 : likesCount + 1;
```

Notice something interesting here.

We aren't updating React yet.

Instead, we're simply calculating the next state.

This is an important pattern.

By computing the new values first, we avoid relying on state that may change later during the function.

Think of these variables as our "future state."

They represent what the application will look like after the user clicks the button.

If the post wasn't liked before...

```text
❤️ 147
```

Then our calculations become

```text
liked = true
likes = 148
```

If the post was already liked...

```text
❤️ 148
```

Then they become

```text
liked = false
likes = 147
```

Nothing has changed on the screen yet.

We've simply worked out what the next state should be.

## Why Calculate Before Updating?

You may wonder why we don't simply write something like this.

```jsx
setIsLiked(!isLiked);
setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
```

Although this may appear to work, calculating the values first makes our code easier to reason about.

Notice that we use the exact same values later when sending data to the server.

```jsx
await updatePost(id, {
  postLiked: liked,
  postLikes: likes,
});
```

Instead of calculating the new values multiple times, we calculate them once and reuse them throughout the function.

This keeps our logic consistent and reduces the chances of mistakes.

## Step 3 — Updating the Interface Immediately

Now comes the optimistic update itself.

```jsx
setIsLiked(liked);
setLikesCount(likes);
```

This is the moment where the user sees the application respond.

- The heart immediately fills with color.
- The number instantly increases.
- No loading spinner appears.
- No waiting.
- No delay.

From the user's perspective, the action is already complete.

Meanwhile, React schedules a re-render and updates the DOM.

The interface changes before we've even contacted the server.

This is the defining characteristic of Optimistic UI.

## What React Is Doing Behind the Scenes

It's worth remembering that calling a state setter doesn't immediately change the value.

When React encounters

```jsx
setIsLiked(liked);
```

it doesn't instantly modify the state.

Instead, React schedules another render using the new values.

During that next render, React compares the previous virtual DOM with the new one.

It notices that the heart icon should now be filled and that the like count has changed.

React then updates only those parts of the page.

Everything else remains untouched.

This is one of the reasons React applications remain efficient even when state changes frequently.

## Step 4 — Synchronizing With the Server

Only after updating the interface do we contact the backend.

```jsx
await updatePost(id, {
  postLiked: liked,
  postLikes: likes,
});
```

Notice the order.

Many beginners naturally write their applications like this.

```text
Send Request

↓

Wait

↓

Update UI
```

Our application does the exact opposite.

```text
Update UI

↓

Send Request

↓

Wait Quietly
```

The server is still doing exactly the same amount of work.

The network is still just as slow.

The only difference is that we've removed the waiting from the user's experience.

This is why optimistic updates improve perceived performance rather than actual performance.

## Step 5 — When Everything Goes Well

Most of the time, the server accepts the request.

When that happens, nothing needs to change.

The interface is already displaying the correct information.

Our optimistic assumption turned out to be true.

The application simply continues running as though nothing special happened.

Interestingly, successful optimistic updates often feel invisible.

Users rarely notice them because everything behaves exactly as they expect.

## Step 6 — When Things Go Wrong

- Networks are unpredictable.
- Connections fail.
- Servers crash.
- Requests time out.

If the server rejects our request, execution jumps directly into the `catch` block.

```jsx
catch (err) {

    setIsLiked(frozenLiked.current);
    setLikesCount(frozenLikesCount.current);

}
```

This is where our earlier snapshot becomes incredibly valuable.

Instead of trying to guess what the previous values were, we simply restore the exact state we saved before the optimistic update.

```text
Before Clicking

❤️ 147

↓

Snapshot Saved

↓

User Clicks

↓

❤️ 148

↓

Server Fails

↓

Restore Snapshot

↓

❤️ 147
```

From React's perspective, this is just another state update.

The component renders again, returning the interface to its previous state.

This rollback keeps the UI synchronized with the server, ensuring users never see incorrect information for long.

## Why Rollbacks Matter

Imagine if we didn't restore the previous state.

The user would continue seeing

```text
❤️ 148
```

even though the server still believes the post has

```text
❤️ 147
```

The application and the database would no longer agree.

This inconsistency can quickly lead to confusing bugs.

Perhaps the user refreshes the page.

Suddenly the number changes back.

From their perspective, it looks as though the application randomly lost their like.

Rollbacks prevent this by ensuring that the interface always reflects the server's final decision.

Optimistic updates are powerful, but they should never ignore failures.

Assuming success is only half of the pattern.

Being prepared for failure is what makes the technique reliable enough for production applications.

## Why Applications Like Instagram Feel Instant

When you tap the Like button on Instagram, the heart fills immediately.

Instagram doesn't wait for its servers to confirm the action before responding.

Instead, it performs an optimistic update just like our project.

Behind the scenes, the app sends the request to Instagram's servers.

If everything succeeds—which it usually does—the optimistic update remains exactly as it is.

If something goes wrong, Instagram quietly restores the previous state or displays an error message asking you to try again.

Facebook reactions, Reddit upvotes, GitHub stars, TikTok likes, and even chat applications like WhatsApp use similar ideas. They acknowledge the user's intent immediately, then synchronize with the server in the background.

This is one of the defining characteristics of modern frontend development: designing interfaces that feel responsive without compromising the accuracy of the underlying data.
