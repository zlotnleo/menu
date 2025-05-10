import {sql} from "@/db/db";

const tmp = await sql("SELECT * FROM ingredient");

export default function Home() {
  return (
    <div>
      {JSON.stringify(tmp)}
    </div>
  );
}
