import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import { useState } from "react";

const CustomersPage: NextPage = () => {
  const { data: session, status: sessionStatus } = useSession();
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const { data: customers, refetch, isLoading } = api.customer.getAll.useQuery(
    undefined,
    { enabled: !!session }
  );

  const createCustomer = api.customer.create.useMutation({
    onSuccess: () => {
      refetch();
      setNewCustomer({ name: "", email: "", phone: "", address: "" });
    },
  });

  if (sessionStatus === "loading" || isLoading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please sign in</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCustomer.mutate(newCustomer);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Rest of your component */}
    </div>
  );
};

export default CustomersPage;
