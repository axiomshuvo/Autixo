"use client";

import { Pagination } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PaginationComponent({ currentPage, totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(currentPage);

  const goToPage = (p) => {
    setPage(p);

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", p);

    router.push(`/explore-cars?${params.toString()}`);
  };

  return (
    <Pagination className="mt-12 justify-center">
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous
            isDisabled={currentPage === 1}
            onPress={() => goToPage(currentPage - 1)}
          >
            <Pagination.PreviousIcon />
            <span>Previous</span>
          </Pagination.Previous>
        </Pagination.Item>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Pagination.Item key={p}>
            <Pagination.Link isActive={p === page} onPress={() => goToPage(p)}>
              {p}
            </Pagination.Link>
          </Pagination.Item>
        ))}

        <Pagination.Item>
          <Pagination.Next
            isDisabled={currentPage === totalPages}
            onPress={() => goToPage(currentPage + 1)}
          >
            <span>Next</span>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}
