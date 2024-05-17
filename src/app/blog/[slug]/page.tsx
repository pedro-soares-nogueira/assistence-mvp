import React from "react";

const PostPage = () => {
  return (
    <main className="container mx-auto px-4 py-8 space-y-20">
      <div className="bg-gray-400 max-w-full w-full h-[24rem] flex items-center justify-center">
        image
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-28 gap-10">
        <div className="md:col-span-2 space-y-12">
          <h2 className="text-3xl md:text-5xl font-bold">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </h2>

          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur.
            <br />
            <br />
            Lorem Ipsum passage, and going through the cites of the word in
            classical literature, discovered the undoubtable source. Lorem Ipsum
            comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
            Malorum" (The Extremes of Good and Evil) by Cicero, written in 45
            BC. This book is a treatise on the theory of ethics, very popular
            during the Renaissance.
            <br />
            <br />
            The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes
            from a line in section 1.10.32.{" "}
            <strong>
              The standard chunk of Lorem Ipsum used since the 1500s
            </strong>{" "}
            is reproduced below for those interested. Sections 1.10.32 and
            1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
            reproduced in their exact original form, accompanied by
            <br />
            <br />
            English versions from the 1914 translation by H. Rackham. Contrary
            to popular belief, Lorem Ipsum is not simply random text. It has
            roots in a piece of classical Latin literature from 45 BC, making it
            over 2000 years old. Richard McClintock, a Latin professor at
            Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a
            <br />
            <br />
            Lorem Ipsum passage, and going through the cites of the word in
            classical literature, discovered the undoubtable source. Lorem Ipsum
            comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
            Malorum" (The Extremes of Good and Evil) by Cicero, written in 45
            BC. This book is a treatise on the theory of ethics, very popular
            during the Renaissance.
            <br />
            <br />
            The first line of Lorem Ipsum,{" "}
            <strong>
              Lorem ipsum dolor sit amet..", comes from a line in section
              1.10.32.
            </strong>{" "}
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced
            below for those interested. Sections 1.10.32 and 1.10.33 from "de
            Finibus Bonorum et Malorum" by Cicero are also reproduced in their
            exact original form, accompanied by English versions from the 1914
            translation by H. Rackham.
          </p>
        </div>
        <div className="min-h-[10rem] max-h-full h-full max-w-full w-full bg-gray-400"></div>
      </div>
    </main>
  );
};

export default PostPage;
