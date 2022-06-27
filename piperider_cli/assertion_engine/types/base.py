import abc

from piperider_cli.assertion_engine import AssertionContext, AssertionResult


class BaseAssertionType(metaclass=abc.ABCMeta):

    @abc.abstractmethod
    def name(self):
        """
        function name of the assertion
        """
        pass

    @abc.abstractmethod
    def execute(self, context: AssertionContext, table: str, column: str, metrics: dict) -> AssertionResult:
        pass

    @abc.abstractmethod
    def validate(self, context: AssertionContext) -> bool:
        pass
