import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { FilterService, HttpService } from "services";
import queryString from "query-string";

import { PageHeader } from "components";
import { Button, Col, InputField, Link, Pagination, Panel, Preloader, Row, Select } from "components/ui";
import CardBoard from "./CardBoard/CardBoard";
import EmptyBoardAlert from "./EmptyBoardAlert/EmptyBoardAlert";

const ListBoard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userConfig = useSelector(state => state.auth.userConfig);

    const [boards, setBoards] = useState({
        content: []
    });
    const [filter, setFilter] = useState({
        name: "",
        owner: ""
    });
    const [owners, setOwners] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const retrieveBoards = useCallback(async (query) => {
        setIsLoading(true);

        const { data } = await HttpService.get("/boards", { params: query });
        setBoards(data);
        setIsLoading(false);
    }, []);

    const retrieveBoardsByQueryParams = useCallback(() => {
        const { name, owner, page: queryPage } = queryString.parse(location.search);

        const newFilter = {
            name: name || "",
            owner: owner || ""
        };

        setFilter(newFilter);

        retrieveBoards(FilterService.cleanFilter({
            ...newFilter,
            page: queryPage
        }));
    }, [location.search, retrieveBoards]);

    const retrieveOwners = useCallback(async () => {
        const { data } = await HttpService.get("/boards/owners");
        const ownersData = [
            {
                label: "Todos",
                value: "all"
            },
            ...data.map(owner => ({
                label: owner,
                value: owner
            }))
        ];

        setOwners(ownersData);
    }, []);

    useEffect(() => {
        retrieveOwners();
        retrieveBoardsByQueryParams();
    }, [retrieveOwners, retrieveBoardsByQueryParams]);

    useEffect(() => {
        retrieveBoardsByQueryParams();
    }, [location.search, retrieveBoardsByQueryParams]);

    const handleFilter = (event) => {
        event.preventDefault();

        const query = FilterService.cleanFilter(filter);

        updateLocationSearch(query);
        retrieveBoards(query);
    };

    const goToPage = (pageNumber) => {
        const query = FilterService.cleanFilter({
            ...filter,
            page: pageNumber
        });

        updateLocationSearch(query);
        retrieveBoards(query);
    };

    const changeFilterValue = (target, value) => {
        setFilter(prevFilter => ({
            ...prevFilter,
            [target]: value
        }));
    };

    const updateLocationSearch = (query) => {
        navigate({
            pathname: "/boards",
            search: queryString.stringify(query)
        });
    };

    return <Row>
        <Col s={12}>
            <PageHeader title="Boards" action={
                <Link to="/boards/new">Novo board</Link>
            }/>
        </Col>

        <Col s={12}>
            <Panel collapsible defaultClose title="Filtro" actions={
                <Button type="submit" onClick={handleFilter}>
                    Filtrar
                </Button>
            }>
                <Row>
                    <InputField s={12} l={6}
                                name="name"
                                onChange={e => changeFilterValue("name", e.target.value)}
                                value={filter.name}
                                label="Nome"/>

                    <Col s={12} l={6}>
                        <Select withoutWrapper
                                options={owners}
                                label="Dono"
                                onChange={selected => changeFilterValue("owner", (selected || {}).value)}
                                value={filter.owner || userConfig?.username}/>
                    </Col>
                </Row>
            </Panel>
        </Col>

        {isLoading ? <Col s={12}>
            <Preloader/>
        </Col> : <>
            {boards.content.map(board =>
                <CardBoard key={board.id}
                           board={board}
                           refreshBoards={() => retrieveBoardsByQueryParams()}/>
            )}

            {boards.numberOfElements === 0 && <EmptyBoardAlert/>}

            <Col s={12}>
                <Pagination data={boards} goToPage={goToPage}/>
            </Col>
        </>}
    </Row>;

};

export default ListBoard;
